import Drawer from "@/components/Drawers/Drawer";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export default function ShopDrawer({ setIsOpen }: Props) {
  return (
    <Drawer onMouseLeave={() => setIsOpen(false)}>
      <p>SHOP</p>
    </Drawer>
  );
}
