import SwaggerJsdoc from "swagger-jsdoc";

const env = process.env.NODE_ENV || 'development';
let host;

console.log(`현재 서버가 ${env} 모드로 호스팅 중입니다.`);

if (env === 'development'){
    host = 'localhost:3000';    
} else if (env === 'production') {
    host = process.env.SERVER_HOST;
}

const options = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'Link Zip API',
            version: '1.0.0',
            description: 'Link Zip API with express, API 설명'
        },
        host: host,
        basepath: '../',
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: '로그인 및 회원가입으로 발급받은 토큰을 입력해주세요.'
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js', './swagger/*']
};

export const specs = SwaggerJsdoc(options);