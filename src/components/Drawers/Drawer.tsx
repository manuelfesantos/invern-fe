import { ReactNode } from "react";
import styles from "./Drawer.module.css";
interface Props {
  children: ReactNode | ReactNode[];
  onMouseLeave: () => void;
}

export default function Drawer({ children, onMouseLeave }: Props) {
  return (
    <div onMouseLeave={onMouseLeave} className={styles.drawer}>
      {children}
    </div>
  );
}
