# NodeJS API Framework (TypeScript)
 API Framework for NodeJS (+ExpressJS)
 
 ## การติดตั้ง
 Package installation
 ```
 npm install
 ```
  
 Migrate prisma database
 ```
 npm run prisma:migrate
 ```
 
 Run in development environment
 ```
 npm run dev
 ```
 
 ## โครงสร้าง
 ```src/api/v1/*``` - Routing / Controller
 
 ```src/framework/database/*``` - Database model configurations
 
 ```src/framework/entity/*``` - ฟังก์ชั่นกลาง *(ใช้ในกรณีที่ Controller หลายตัวเรียกใช้งานฟังชั่นเดิมซ้ำๆ)*
 
 
 ## วิธีใช้งาน
 ### การสร้าง Route / Controller
 รูปแบบ route  
 ```
 /api/v1/<feature>/<function>
 ```  
 **feature** คือ folder ที่เก็บรวมฟังก์ชั่นเป็นหมวดหมู่  
 **function** คือฟังก์ชั่นที่ทำงานเฉพาะเจาะจงสำหรับ feature นั้นๆ
 
 ยกตัวอย่าง  
 ```
 /api/v1/profile/get
 /api/v1/profile/update
 /api/v1/profile/change-password
 /api/v1/profile/reset-password
 ```  
 
 ในการสร้าง Route และ Controller ทำได้โดยการที่สร้างโฟลเดอร์ใน `src/api/v1/` โดยใช้ชื่อโฟลเดอร์ให้เหมาะสมแต่ละ feature ที่ได้ทำ โดยใน folder นั้นจะต้องมีไฟล์ `route.ts` ที่จะเป็นไฟล์รวบรวม controller ต่างๆ และตั้งค่า method และชื่อ route ด้วย 
 
 ยกตัวอย่าง *(/src/api/v1/profile/route.ts)*
 ```typescript
import {makeHandler} from "@/core/express/router";
import express from "express"
//...
const router = express.Router();

router.get('/get', makeHandler(getProfile));
router.post('/update', makeHandler(updateProfile));
router.post('/change-password', makeHandler(changePassword));
router.post('/reset-password', makeHandler(resetPassword));

export default router;
 ```
 
 **หมายเหตุ**
 ฟังก์ชั่น `makeHandler` จะรับค่าฟังก์ชั่นที่เป็น Controller เท่านั้นโดยจะต้องกำหนด Parameter เป็น request: express.Request เช่น
 
 *src/api/v1/profile/getProfile.ts*
 ```typescript
 import express from "express";
 
 export default function (request: express.Request) {
   return {data: 1 + 1};
 }
 ```
 
 * ดูตัวอย่างเพิ่มเติมได้ที่ /src/api/v1/example/* *
 
 
 ### - การใช้งาน Redis 
 จำเป็นจะต้องเปิดใช้งานและตั้งค่า Redis ในไฟล์ `.env` ก่อน!
 ```.env
 //..
 ENABLE_REDIS=1
 //..
 REDIS_HOST="host ของ redis"
 REDIS_PORT=6379
 REDIS_PASSWORD="รหัสผ่าน redis"
 ```
 
 ในการใช้งานฟังก์ชั่นใดก็ตามที่ต้องการจะใช้งานร่วมกันกับ Redis ให้ใช้ฟังก์ชั่น useCache
 
 ยกตัวอย่าง
 ```typescript
 import { useCache } from '@/framework/entity/redis';
 //..
 
 export default async function () {
   let userId = 100;
   let limit = 5;
   let getAccountsOld = await database().getAccounts(userId, limit); //แบบเดิม
   let getAccountsNew = await useCache(database().getAccounts, userId, limit); //แบบใช้ Redis
   //..
 }
 ```
 
 ### - การสร้าง Database
 สร้างไฟล์ `<table>.prisma` ในโฟลเดอร์ * /prisma/schema/* * เช่น
 
 *prisma/schema/example.prisma*
 ```prisma
 model example {
  id        Int     @default(autoincrement()) @id
  name      String  @default("John Doe")
  email     String  @default("john@doe.com")
  password  String  @default("j1234d")
}
 ```
 
 หลังจากสร้างไฟล์ .prisma เรียบร้อยแล้วให้รันคำสั่ง
 ``` 
 npm run prisma:merge
 ```
 
 เมื่อรันแล้วให้มาสร้างไฟล์ `src/framework/database/<table>/index.ts` เพื่อสร้างฟังก์ชั่น Database สำหรับนำไปใช้ใน function อื่นๆ ต่อไป เช่น
 
 *src/framework/database/example/index.ts*
 ```typescript
import BaseDatabase from "@/core/database/base-database";

class Example extends BaseDatabase{
    public table(): any{
        return this.prisma.example;
    }
}
export default new Example;
 ```
 .  
 จากนั้นให้มากำหนด Table ของ Database ในไฟล์ *index.ts* เพื่อทำการส่งออกไปใช้ต่อข้างนอก
 
 *src/framework/database/index.ts*
 ```typescript
//..
import OtherTable from "./other-table";
import Example from "./example";

export {OtherTable, Example};
 ```
 
 *__หมายเหตุ__ ห้ามแก้ไขไฟล์ schema.prisma, กรณีที่จะแก้ไข Database Provider ให้แก้ไขที่ connection.prisma เท่านั้น*
 
 ### - การสร้าง Entity
 ให้สร้างโฟลเดอร์ในการเก็บ entity ให้เป็นหมวดหมู่ตามความเหมาะสม เช่น
 ```
 src/framework/entity/example/hyper-parabolic-formular.ts
 src/framework/entity/example/parabolic-formular.ts
 src/framework/entity/example/average-formular.ts
 src/framework/entity/example/index.ts
 ```
 
 **หมายเหตุ** เมื่อสร้างไฟล์ entity เสร็จแล้วอย่าลืมรวมฟังก์ชั่นต่างๆ ไว้ในไฟล์ `index.ts` ของ entity นั้นๆ เพื่อส่งออกไปใช้ข้างนอกด้วย
 
 ### - การใช้ Middleware
 - กรณีที่เขียน Middleware เอง (Custom Middleware)
 ```typescript
 import express from "express";
 import middleware from "@/core/express/custom-middleware";
 import CustomError from "@/core/exception";
 //..
 
 router.use(middleware((request: express.Request, setStatus: Function)=>{
   if(error) {
     setStatus(404); // set http status code
     throw new CustomError("Test middleware error");
   }
   return true; // call next() function
 }));
 ```

 - กรณีใช้ Middleware ของที่อื่น (3rd-Party Middleware)
 ```typescript
 import { MiddlewareExceptionBuilder } from "@/framework/entity/core";
 import otherMiddleware from "otherMiddleware";
 //..
 
 router.use(MiddlewareExceptionBuilder(otherMiddleware()));
 ```
 
 ### - การใช้ Error
 ในการทำงาน Controller อาจจะมีการตรวจสอบ Input ซึ่งในกรณีที่ต้องการโยน Error เพื่อส่งให้ Client สามารถทำได้โดยใช้ Error ของ Framework ที่ชื่อ CustomError 
 
 ยกตัวอย่างเช่น
 ```typescript
 import CustomError from '@/core/exception';
 //..
 
 if(isValid) throw new CustomError("this is error message", 404);
 ```
 
 โครงสร้าง
 ```
 throw new CustomError(<Message>, <StatusCode>);
 ```
 `<Message>` ข้อความของ Error  
 `<StatusCode>` HTTP response status codes  
 
 
 ### - การเขียน Unit Test
 *สามารถดูตัวอย่างจากไฟล์ในโฟลเดอร์ src/\_\_tests__/example.spec.ts*  
 หากต้องการรัน Unit Test ให้ใช้คำสั่ง
 ```
 npm run test
 ``` 
 
 ### - Built-In Entities
 - JWT Validator Middleware *(auth/required-token)*
 ใช้สำหรับ Router ไหนที่ต้องการข้อมูลของ JWT Token (Middleware ตรวจสอบ JWT Token ที่แนบมาและจำเป็นต้องแนบมาด้วยทุกครั้งในการใช้งาน Route นี้)
 ```typescript
 import {RequiredToken} from "@/framework/entity/auth"
 //..
 router.use(RequiredToken());
 ```
 - JWT Authentication *(auth/login)*
 
 ** Coming Soon **
 
 - Custom Console Log *(core/console-debug)*
 ฟังก์ชั่นที่ทำเพื่อรองรับการตั้งค่าจาก .env ใช้ทำงานได้กับ production จริง
 ```typescript
 import { cd } from "@/framework/entity/core";
 //..
 cd(`this is console.log`); //console.log(`this is console.log`);
 ```
 - Redis *(redis)*

 ** อ่านเพิ่มเติมที่หัวข้อ *การใช้งาน Redis* **

 *Finished!*
 

 ## TODO
 - [x] Unit Test support
 - [x] Custom Middleware feature
 - [x] Add request validator feature
 - [x] Built-in UUID
 - [x] Security feature
 - [x] Docker
 - [x] Redis Database
 - [x] Performance improve
 - [x] Route path customizable
 - [x] Reflection improve
 - [ ] CI/CD

## License
ไม่อนุญาตให้นำไปใช้ในโปรเจ็กท์อื่นที่ไม่ได้รับอนุญาต, การนำไปใช้งานจะ**ต้องได้รับอนุญาต**ก่อนเท่านั้น!

## Contributors

@AomDEV
[aom.dev](https://aom.dev)
