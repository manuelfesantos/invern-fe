import Drawer from "@/components/Drawers/Drawer";
import { ICollection } from "@/types/store/collection";
import { collectionsMock } from "@/mocks/collections";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./Drawer.module.css";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

function Collection({
  collection,
  setIsOpen,
}: {
  collection: ICollection;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [focused, setFocused] = useState(false);
  const { images, name } = collection.products[0];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1rem",
      }}
    >
      <Link
        href={"/collections/" + collection.name.toLowerCase()}
        style={{
          fontSize: focused ? "1.5rem" : "1.25rem",
          fontWeight: focused ? "normal" : "lighter",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        }}
        onMouseEnter={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        onClick={() => setIsOpen(false)}
      >
        {collection.name}
      </Link>
      <Link
        href={"/collections/" + collection.name.toLowerCase()}
        style={{
          width: focused ? "100%" : "90%",
          aspectRatio: "1/1",
          position: "relative",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        }}
        onMouseEnter={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        onClick={() => setIsOpen(false)}
      >
        <Image
          src={images[0]}
          alt={name}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "0.5rem",
          }}
        />
      </Link>
    </div>
  );
}

function CollectionDiv({
  collections,
  setIsOpen,
}: {
  collections: ICollection[];
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "1rem",
        width: "80%",
      }}
    >
      {collections.map((collection) => (
        <Collection
          key={collection.id}
          collection={collection}
          setIsOpen={setIsOpen}
        />
      ))}
    </div>
  );
}

export default function CollectionsDrawer({ setIsOpen }: Props) {
  return (
    <Drawer onMouseLeave={() => setIsOpen(false)}>
      <h1>COLLECTIONS</h1>
      <CollectionDiv collections={collectionsMock} setIsOpen={setIsOpen} />
      <Link href={"/collections"} onClick={() => setIsOpen(false)}>
        <div className={styles.collection}>VIEW ALL</div>
      </Link>
    </Drawer>
  );
}
