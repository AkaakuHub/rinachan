"use client";

import React from "react";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import clsx from "clsx";

import { RinachanDataType } from "../../type";

import rinachanData_ from "@/assets/data/emotion.json";
const rinachanData: RinachanDataType = rinachanData_;

import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';

const Page = () => {
  const [currentEmotion, setCurrentEmotion] = useState<string>("smile");
  const [currentData, setCurrentData] = useState([]);

  const [emotions, setEmotions] = useState<string[]>([]);

  const [intervalTime, setIntervalTime] = useState<number>(5);

  const rowArray: number[] = Array.from({ length: 13 }, (_, i) => i);
  const columnArray: number[] = Array.from({ length: 20 }, (_, i) => i);

  useEffect(() => {
    setCurrentData(rinachanData[currentEmotion]);
  }, [currentEmotion]);

  // rinachanDataからemotionsを取得
  useEffect(() => {
    setEmotions(Object.keys(rinachanData));
  }, []);

  // sごとにemotionsを切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex: number = emotions.indexOf(currentEmotion);
      const nextIndex: number = (currentIndex + 1) % emotions.length;
      setCurrentEmotion(emotions[nextIndex]);
    }, intervalTime * 1000);
    return () => clearInterval(interval);
  }, [currentEmotion, emotions, intervalTime]);

  return (
    <div className={styles["root"]}>
      <Select
        value={currentEmotion}
        onChange={(event) => setCurrentEmotion(event.target.value)}
        className={styles["select"]}
      >
        {emotions.map((emotion) => (
          <MenuItem key={emotion} value={emotion}>
            {emotion}
          </MenuItem>
        ))}
      </Select>
      <span>
        <Input type="number" value={intervalTime} onChange={(event) => {
          const current: number = parseInt(event.target.value);
          if (current < 1 || event.target.value === "") {
            setIntervalTime(1);
            return;
          }
          setIntervalTime(parseInt(event.target.value))
        }}
          className={styles["input"]}
        />
        秒ごとに切り替わります
      </span>
      <div className={styles["container-wrapper"]}>
        {currentData.length !== 0 && (
          <div className={styles.container}>
            {rowArray.map((row, rowIndex) => {
              const currentRow: number[] = currentData[rowIndex];
              return (
                <div key={`row-${rowIndex}`} className={styles.row}>
                  {columnArray.map((column, columnIndex) => {
                    const isPink: boolean = currentRow.includes(column);
                    return (
                      <span
                        key={`cell-${rowIndex}-${columnIndex}`}
                        className={clsx(styles.cell, isPink && styles.pink)}
                      ></span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
