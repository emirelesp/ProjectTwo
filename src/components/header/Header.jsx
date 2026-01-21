import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import UserPanel from '../user-panel/UserPanel';
import './Header.scss';
import { Template } from 'devextreme-react/core/template';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import { Label } from 'devextreme-react/cjs/form';


export default function Header({ menuToggleEnabled, title, toggleMenu }) {

   
  return (
   
    <header className={'header-component'}>
      <Toolbar className={'header-toolbar'}>

   

        <Item
          visible={menuToggleEnabled}
          location={'before'}
          widget={'dxButton'}
          cssClass={'menu-button'}
        >
  
          <Button icon="menu" stylingMode="text" onClick={toggleMenu}/>
              
        </Item>

        <Item
              visible={true}
              location="before" 
              component={() => (
                <div className="toolbar-item" style={{width:"140px"}}>
                  <img src="/logos/LOGO CONALEP-02.svg" height={"60px"} alt="menu"/>
                </div>
              )}
        
        />

          
       <Item
          location={'before'}
          cssClass={'header-title'}
     
          visible={true}

            component={() => (
                <div className="toolbar-item d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                  <div style={{width:"180px",height:"100%"}}></div>
                </div>
              )}
        /> 

        

        <Item
          location={'before'}
          cssClass={'header-title'}
     
          visible={!!title}

            component={() => (
                <div className="toolbar-item d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block">
                  <div className='titularesVerde' style={{maxWidth:'275px', width:"100%" }}>{title}</div>
                </div>
              )}
        />
       {/*  <Item
          location={'after'}
        >
          <ThemeSwitcher />
        </Item> */}
        <Item location='after' locateInMenu='auto' menuItemTemplate='userPanelTemplate'>
          <UserPanel menuMode='context' />
        </Item>
        <Template name='userPanelTemplate'>
          <UserPanel menuMode='list' />
        </Template>

      </Toolbar>
    </header>
)}
