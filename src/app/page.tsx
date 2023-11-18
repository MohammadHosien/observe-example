"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const element = useRef(null);

  const exmaple = async () => {
    setLoading(false);
    const req = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`
    );
    const res = await req.json();
    console.log(res);
    if (res.products.length == 0) {
      sethasMore(false);
    } else {
      setData((prev: any) => [...prev, ...res.products]);
      setPage(prev=>prev + 1);
    }
    
    
  };

  useEffect(() => {
    
    const observe = new IntersectionObserver((entires) => {
      const firstEnt = entires[0];
      if (firstEnt.isIntersecting && hasMore) {
        exmaple();
      }
    });
    if (observe && element) {
      observe.observe(element.current);
    }
    return () => {
      if (observe) {
        observe.disconnect();
      }
    };
  },[data]);

  console.log(hasMore)

  // useEffect(() => {
  //   (async () => {
  //     setLoading(false);
  //     const req = await fetch(
  //       `https://dummyjson.com/products?limit=10&skip=${page * 10}`
  //     );
  //     const res = await req.json();
  //     console.log(res);
  //     if (res.products.length == 0) {
  //       sethasMore(false);
  //     } else {
  //       setData((prev: any) => [...res.products]);
  //     }
  //   })();
  // }, []);

  return (
    <>
      {data.map((item: any) => (
        <>
          <img src={item.images[0]} />
          <div>{item.title}</div>
        </>
      ))}
      {hasMore && (
        <div className="" ref={element}>
          loading
        </div>
      )}
    </>
  );
}
