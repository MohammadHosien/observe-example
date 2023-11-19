"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const element = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    let page = -1;
    console.log(element.current?.innerText === "");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          (async () => {
            page++;
            setLoading(false);
            if (element.current?.innerText !== "") {
              console.log("hello")
              
              const req = await fetch(
                `https://dummyjson.com/products?limit=10&skip=${page * 10}`
              );
              const res = await req.json();
              if (res.products.length == 0) {
                return sethasMore(false);
              }
              setData((prevItems: any) => [...prevItems, ...res.products]);
              setLoading(true);
            }
          })();
        }
      },
      { threshold: 1 }
    );

    if (element.current) {
      observer.observe(element.current);
    }
    return () => {
      if (element.current) {
        observer.unobserve(element.current);
        observer.disconnect();
      }
    };
  }, [element.current]);

  return (
    <>
      {data.map((item: any) => (
        <div className="text-center max-h-screen">
          <img className="mx-auto" src={item.images[0]} />
          <div>{item.title}</div>
        </div>
      ))}
      {hasMore && loading ? (
        <div className=" text-center text-[40px] bg-slate-800" ref={element}>
          loading
        </div>
      ) : (
        <div ref={element} className=" text-center text-[40px] w-32 h-14"></div>
      )}
    </>
  );
}
