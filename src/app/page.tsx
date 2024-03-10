"use client";

import React from "react";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import clsx from "clsx";

import { RinachanDataType } from "../../type";

import rinachanData_ from "@/assets/data/emotion.json";
const rinachanData: RinachanDataType = rinachanData_;

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Page = () => {
  const [currentEmotion, setCurrentEmotion] = useState<string>("smile");
  const [currentData, setCurrentData] = useState([]);

  const [emotions, setEmotions] = useState<string[]>([]);

  const rowArray: number[] = Array.from({ length: 13 }, (_, i) => i);
  const columnArray: number[] = Array.from({ length: 20 }, (_, i) => i);

  useEffect(() => {
    setCurrentData(rinachanData[currentEmotion]);
  }, [currentEmotion]);

  // rinachanDataからemotionsを取得
  useEffect(() => {
    setEmotions(Object.keys(rinachanData));
  }, []);

  return (
    <div className={styles["root"]}>
      still in dev... coming soon! <br />
      <Select
        value={currentEmotion}
        onChange={(event) => setCurrentEmotion(event.target.value)}
      >
        {emotions.map((emotion) => (
          <MenuItem key={emotion} value={emotion}>
            {emotion}
          </MenuItem>
        ))}
      </Select>
      {currentData.length !== 0 && (
        <div className={styles.container}>
          {rowArray.map((row, rowIndex) => {
            const currentRow: number[] = currentData[rowIndex];
            return (
              <>
                {columnArray.map((column, columnIndex) => {
                  const isPink: boolean = currentRow.includes(column);
                  return (
                    <span key={`${row}-${column}`}
                      className={clsx(styles["cell"], isPink && styles["pink"])}
                    >
                    </span>
                  );
                })}
              </>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default Page;
