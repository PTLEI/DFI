import { Fragment } from "react";
import { useGlobalContext } from "@/context";

export default function TabBlocks() {
  const { setEditingKey } = useGlobalContext();

  return (
    <Fragment>
      <section>
        <h2>Site Information</h2>
        <ul className="list-none">
          <li className="flex border-b border-gray-400">
            <div
              onClick={() => {
                setEditingKey?.("personal_info");
              }}
            >
              Personal Info
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h2>Header Section</h2>
        <ul className="list-none">
          <li className="flex border-b border-gray-400">
            <div
              onClick={() => {
                setEditingKey?.("badges");
              }}
            >
              Badges
            </div>
          </li>
          <li className="flex border-b border-gray-400">
            <div
              onClick={() => {
                setEditingKey?.("about_me");
              }}
            >
              About Me
            </div>
          </li>
          <li className="flex border-b border-gray-400">
            <div
              onClick={() => {
                setEditingKey?.("social");
              }}
            >
              Social
            </div>
          </li>
          <li className="flex border-b border-gray-400">
            <div
              onClick={() => {
                setEditingKey?.("contact_me");
              }}
            >
              Contact Me
            </div>
          </li>
        </ul>
      </section>
      <section>
        <h2>Body Section</h2>
      </section>
      <section>
        <h2>Block Library</h2>
      </section>
    </Fragment>
  );
}
