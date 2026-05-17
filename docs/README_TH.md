# SuperHero Agent สำหรับ Minecraft Education 1.21.133

## แนวคิด
เปลี่ยนจากหุ่น TNT เป็นเพื่อนร่วมทีมที่ช่วยป้องกันผู้เล่น โดยให้ผู้เล่นระดับ Member ใช้งานได้ผ่าน gameplay ปกติ ไม่ต้องพึ่ง slash command

## ความสามารถหลัก
- ผู้เล่น 1 คนมี SuperHero Agent ได้ 1 ตัว
- แสดงชื่อเจ้าของเหนือหัว Agent
- เมื่อสร้าง Agent ใกล้ผู้เล่น ระบบจะผูก Agent กับผู้เล่นคนนั้นอัตโนมัติ
- ติดตามเจ้าของ
- ป้องกันเจ้าของและโจมตี hostile mobs รอบตัว
- มีเลือด เจ็บได้ ตายได้
- ฟื้นเลือดด้วย `bread`, `cooked beef`, `golden apple`
- เพิ่มพลังด้วย `iron ingot`, `gold ingot`, `diamond`

## ระดับพลัง
- Level 1: เริ่มต้น
- Level 2: ใช้ `iron ingot`
- Level 3: ใช้ `gold ingot`
- Level 4: ใช้ `diamond`

## ไฟล์สำคัญ
- Add-on พร้อมใช้: `RaiseSuperHeroAgent.mcaddon`
- Source add-on: `addon_src/SuperHeroAgent_BP` และ `addon_src/SuperHeroAgent_RP`
- MakeCode extension สำหรับ GitHub: `RaiseSuperHeroAgent`

## หมายเหตุด้านระบบ
- การจำกัด 1 ตัวต่อผู้เล่น และการตั้งชื่อบนหัว ใช้ script เล็ก ๆ ใน behavior pack
- MakeCode extension ถูกออกแบบให้ Member-safe โดยไม่เรียก slash command
- เป้าหมายเวอร์ชัน: Minecraft Education 1.21.133

## สิ่งที่ควรทดสอบในเกมจริง
1. import add-on
2. spawn SuperHero Agent
3. ตรวจว่า Agent ใกล้ผู้เล่นถูกผูกเป็นของผู้เล่นคนนั้น
4. ตรวจว่าผู้เล่นคนเดิมสร้าง Agent ตัวที่ 2 ไม่ได้
5. ตรวจว่าชื่อผู้เล่นแสดงเหนือหัว Agent
6. ทดสอบการโจมตี hostile mobs
7. ทดสอบการฟื้นเลือดและการอัปเกรดแต่ละระดับ
