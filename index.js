import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import SwaggerUi from 'swagger-ui-express';
import asyncHandler from 'express-async-handler';

import '@config/global.js';
import { specs } from '@config/swagger.config.js';
import { status } from '@config/response.status.js';
import { response } from '@config/response.js';
import { pool } from '@config/db.config.js';
import { tokenAuthMiddleware } from '@config/authMiddleware';

import { alertRouter } from '@routes/alert.route.js';
import { userRouter } from '@routes/user.route.js';
import { listRouter } from '@routes/list.route.js';
import { linkRouter } from '@routes/link.route.js';
import { zipRouter } from '@routes/zip.route.js'
import { noticeRouter } from '@routes/notice.route';
import { searchRouter } from '@routes/search.route';

import { addUserCnt, checkNicknameCnt, getTestTokenCnt, kakaoLoginCnt } from '@controllers/user.controller';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록
app.use(express.urlencoded({extended: true})); // 단순 객체 문자열 형태로 본문 데이터 해석


// 토큰 검증 예외 라우트
app.post('/user/login', asyncHandler(kakaoLoginCnt)); // 로그인
app.get('/user', asyncHandler(checkNicknameCnt)); // 닉네임 중복 체크
app.post('/user', asyncHandler(addUserCnt)); // 회원가입
app.post('/user/token/test', asyncHandler(getTestTokenCnt)); // 테스트용 토큰 발급
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// 모든 route에 대해 검증 미들웨어 적용
app.use(tokenAuthMiddleware);

// router setting
app.use('/list', listRouter);
app.use('/user', userRouter);
app.use('/link', linkRouter);
app.use('/zips', zipRouter);
app.use('/alert', alertRouter);
app.use('/notice', noticeRouter);
app.use('/search', searchRouter);

/** DB 연결 테스트용 라우팅 */
app.get('/', async (req, res)=>{
    const [results, fields] = await pool.query('select * from user');
    console.log('Query result: ', results);
    res.send(results);
});


app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 

    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(app.get('port'), () => {
    console.log(`✅ 서버를 ${app.get('port')}번 포트에서 열었습니다.`);
});
