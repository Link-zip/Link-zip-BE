import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 2000, "message": "success!"},
    CREATED: {status: StatusCodes.CREATED, "isSuccess": true, "code": 2000, "message": "create success!"},

    // error
    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON000", "message": "서버 에러, 관리자에게 문의 바랍니다." },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON001", "message": "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON002", "message": "권한이 잘못되었습니다." },
    METHOD_NOT_ALLOWED: {status: StatusCodes.METHOD_NOT_ALLOWED, "isSuccess": false, "code": "COMMON003", "message": "지원하지 않는 Http Method 입니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": "COMMON004", "message": "금지된 요청입니다." },
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "COMMON005", "message": "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다." },
    
    // db error
    PARAMETER_IS_WRONG: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "DB001", "message": "잘못된 요청 파라미터입니다." },
    FAILED_TO_UPDATE: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "DB002", "message": "DB 데이터 업데이트에 실패했습니다." },
    FAILED_TO_DELETE: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "DB003", "message": "DB 데이터 삭제에 실패했습니다." },


    // alert error
    ALERT_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "ALERT001", "message": "해당 알림을 찾을 수 없습니다." },
    ALERT_ALREADY_EXIST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "ALERT002", "message": "이미 존재하는 알림입니다."} 

};