# SuperHero Agent สำหรับ Minecraft Education 1.21.133

## แนวคิด
เปลี่ยนจากหุ่น TNT เป็นเพื่อนร่วมทีมที่ช่วยป้องกันผู้เล่น โดยให้ผู้เล่นระดับ Member ใช้งานได้ผ่าน gameplay ปกติ ไม่ต้องพึ่ง slash command

## ความสามารถหลัก
- ผู้เล่น 1 คนมี SuperHero Agent ได้ 1 ตัว
- แสดงชื่อเจ้าของเหนือหัว Agent
- เมื่อสร้าง Agent ใกล้ผู้เล่น ระบบจะผูก Agent กับผู้เล่นคนนั้นอัตโนมัติ
- Agent ลอยอยู่ข้างผู้เล่น
- ถ้าวางไข่ตัวใหม่ Agent เดิมจะ teleport กลับมาหาผู้เล่น แม้อยู่คนละมิติ
- แสดงค่า `HP` และ `STR` ข้างชื่อย่อ `SH`
- ติดตามเจ้าของ
- ป้องกันเจ้าของและโจมตี hostile mobs รอบตัว
- มีเลือด เจ็บได้ ตายได้
- ฟื้นเลือดด้วย `bread`, `cooked beef`, `golden apple`
- เพิ่มพลังด้วย `iron ingot`, `gold ingot`, `diamond`
- คำสั่งใน extension: `fight`, `heal player`, `defend`, `light mode`
- `light mode` ให้แสงรอบ Agent และทำให้ค่า Strength ค่อย ๆ ลดลง
- ตอนต่อสู้ Agent จะหมุนรอบตัวและมี effect รอบตัว

## ระดับพลัง
- Level 1: เริ่มต้น
- Level 2: ใช้ `iron ingot`
- Level 3: ใช้ `gold ingot`
- Level 4: ใช้ `diamond`

## ไฟล์สำคัญ
- Add-on พร้อมใช้: `RaiseSuperHeroAgent.mcaddon`
- Source add-on: `packs/source/SuperHeroAgent_BP` และ `packs/source/SuperHeroAgent_RP`
- MakeCode extension สำหรับ GitHub: `RaiseSuperHeroAgent`

## หมายเหตุด้านระบบ
- เวอร์ชันปัจจุบันใช้ script เล็ก ๆ ใน behavior pack สำหรับการผูกเจ้าของ, จำกัด 1 ตัวต่อผู้เล่น, แสดงค่า `HP` / `STR`, เรียก Agent กลับข้ามมิติ, โหมดที่สั่งผ่าน MakeCode และ `light mode`
- การต่อสู้ การฟื้นเลือด และการอัปเกรดหลักยังทำงานผ่าน gameplay ปกติของ add-on
- MakeCode extension ถูกออกแบบให้ Member-safe โดยไม่เรียก slash command
- เป้าหมายเวอร์ชัน: Minecraft Education 1.21.133

## แนวทางสำหรับรุ่นถัดไป
- ถ้าจะเปลี่ยนเป็น add-on แบบ gameplay ล้วน ต้องตรวจรายการความสามารถอีกครั้ง และเขียนเอกสารเฉพาะสิ่งที่ทำงานได้โดยไม่พึ่ง script
- ถ้ายังต้องใช้ Script API หรือความสามารถแบบทดลอง ต้องระบุใน release notes และคู่มือติดตั้งให้ชัดเจนว่าต้องเปิด world setting ใดบ้าง
- ก่อนปล่อยจริง ควรทดสอบในโลกใหม่และอัปเดตคู่มือให้ตรงกับพฤติกรรมที่ผู้เล่นเห็นจริง

## สิ่งที่ควรทดสอบในเกมจริง
1. import add-on
2. spawn SuperHero Agent
3. ตรวจว่า Agent ใกล้ผู้เล่นถูกผูกเป็นของผู้เล่นคนนั้น
4. ตรวจว่าผู้เล่นคนเดิมสร้าง Agent ตัวที่ 2 ไม่ได้
5. ตรวจว่าชื่อผู้เล่นแสดงเหนือหัว Agent
6. ทดสอบการโจมตี hostile mobs
7. ทดสอบการฟื้นเลือดและการอัปเกรดแต่ละระดับ
