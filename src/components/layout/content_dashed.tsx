import { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";

import { useGlobalContext } from "@/context";
import { SECTION_TITLE } from "@/constant/general";
const ContentDashed = ({
  id,
  className,
  children,
  mockAnimation,
  editing,
}: {
  id: string;
  className?: string;
  mockAnimation?: boolean;
  editing?: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setEditingKey, setEditingExtra, locationKey } = useGlobalContext();

  const handleEdit = useCallback(() => {
    setEditingKey?.(id);
    setEditingExtra?.();
  }, [id, setEditingKey, setEditingExtra]);

  useEffect(() => {
    if (ref.current && locationKey === id) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [id, locationKey]);

  return (
    <div
      id={id}
      ref={ref}
      className={clsx(
        "content-dashed rounded-xl",
        locationKey === id && "located",
        editing && "animate-pulse"
      )}
      onClick={handleEdit}
    >
      <div
        className={clsx("info-block-title hidden font-bold", mockAnimation && "shimmer")}
      >{`${SECTION_TITLE[id]}${mockAnimation ? " (Preview)" : ""}`}</div>
      <div className={clsx(className, mockAnimation && "shimmer")}>
        {children}
      </div>
    </div>
  );
};

export default ContentDashed;
