import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import _ = require("lodash");
import { ServerResponse } from "http";

const changeMessage = (status:number,exception:any)=>{ 
    // if (status == HttpStatus.UNAUTHORIZED) { 
    //     return "请先登录"
    // }
    if (status == HttpStatus.FORBIDDEN) {
        return "权限不足"
    } else if (_.get(exception, "response.message")) {
        return _.get(exception, "response.message")
    } else { 
        return _.get(exception, "message")
    }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof HttpException) {
            let message = changeMessage(status,exception)
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message:message,
                path: request.url,
              });
			return;
		}

        //处理mongodb的异常
		let out = {
			name: _.get(exception, "name"),
			message: _.get(exception, "message"),
		};
		if (out.name == undefined && out.message == undefined) {
			console.log(exception);
		} else {
			console.log(out);
		}

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			name: _.get(exception, "name"),
			message: _.get(exception, "message"),
			path: request.url,
        });
        //end 处理mongodb的异常
	}
}
