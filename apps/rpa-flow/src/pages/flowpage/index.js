import WorkList from "../../components/Lists/workList";
import {
  HeaderAppbar,
  LeftMenu,
  MainContainer,
  BottomFooter,
  LayoutBase,
} from "../../layouts/LayoutBase";
import { LayoutPopup1 } from "../../layouts/LayoutPopUp1";

function MenuPop() {
  return (
    <WorkList>
      <LayoutPopup1 />
    </WorkList>
  );
}

export default function FlowPage() {
  return (
    <LayoutBase>
      <HeaderAppbar></HeaderAppbar>
      <LeftMenu>
        <MenuPop />
      </LeftMenu>
      <MainContainer></MainContainer>
      <BottomFooter></BottomFooter>
    </LayoutBase>
  );
}
