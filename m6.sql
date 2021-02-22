USE mall;

SELECT * FROM yaocart;

SELECT cart_count*jifen AS xiaoji FROM yaocart WHERE id=3;

-- 兑换购物车
CREATE TABLE duigou(
itemCode VARCHAR(255),
imageUrl VARCHAR(255),
NAME VARCHAR(255),
dui_count INT(11),
integralValue VARCHAR(255)
);

SELECT * FROM duigou;
UPDATE duigou SET dui_count=2 WHERE itemCode=11134356; 

SELECT * FROM huoqu;

-- 积分兑换记录
CREATE TABLE duihuan(
dh_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
dh_jifen VARCHAR(255),
dh_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM duihuan;
SELECT * FROM myhistory;
SELECT * FROM huoqu;

DELETE FROM duihuan;
DELETE FROM myhistory WHERE hi_id != 11;
DELETE FROM huoqu WHERE hq_id != 12;