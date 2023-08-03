"use client";
import React, { useState } from "react";
import styles from "./../../../styles/Form.module.css"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/v1/posts",
        {
          content: value,
        },
        {
          headers: {
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );
      router.refresh()
      router.push("/")
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
        <h2>質問を投稿する</h2>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick} className={styles.btn}>送信</button>
    </div>
  );
};

export default Page;
