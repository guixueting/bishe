USE mall;

SELECT * FROM yaocart;

SELECT SUM(cart_count)AS sum_count FROM yaocart;
SELECT SUM(cart_count*jifen) AS zong_jifen FROM yaocart;

SELECT * FROM shoucang;
DELETE FROM shoucang;

-- 积分获取记录
CREATE TABLE huoqu(
hq_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
hq_jifen VARCHAR(255),
hq_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM huoqu;
INSERT INTO  huoqu(hq_jifen) VALUES (0);
-- 历史积分记录
CREATE TABLE myhistory(
hi_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
hi_jifen VARCHAR(255),
hi_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP  TABLE myhistory;
DROP  TABLE huoqu;
INSERT INTO myhistory(hi_jifen) VALUES (3000);

SELECT * FROM myhistory;

DELETE FROM huoqu;
DELETE FROM myhistory;












SELECT SUM(hq_jifen) AS hq_jifen FROM huoqu;

SELECT hq_jifen FROM huoqu;