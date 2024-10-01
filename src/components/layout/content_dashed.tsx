import { useGlobalContext } from "@/context";
import { useCallback, useEffect, useRef } from "react";
import { SECTION_TITLE } from "@/constant/general";
const ContentDashed = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setEditingKey, locationKey } = useGlobalContext();

  const handleEdit = useCallback(() => {
    setEditingKey?.(id);
  }, [id, setEditingKey]);

  useEffect(() => {
    if (ref.current && locationKey === id) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [id, locationKey]);

  return (
    <div
      id={id}
      ref={ref}
      className={`content-dashed rounded-xl ${locationKey === id ? "located" : ""} ${className}`}
      onClick={handleEdit}
    >
      <div className="info-block-title hidden">{SECTION_TITLE[id]}</div>
      {children}
    </div>
  );
};

export default ContentDashed;
