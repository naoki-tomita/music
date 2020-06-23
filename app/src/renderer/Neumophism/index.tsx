import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { classNames } from "../Utils";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const { useState } = React;

export const Button: React.FC<{
  color?: "primary" | "secondery";
  fontColor?: "dark" | "secondary" | "info" | "success" | "danger" | "gray";
  pill?: boolean;
  icon?: IconProp;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  disabled?: boolean;
}> = ({ color, fontColor, pill, size, block, disabled, children }) => {
  const className = classNames({
    btn: true,
    ...(color && { [`btn-${color}`]: true } || {}),
    ...(fontColor && { [`text-${fontColor}`]: true } || {}),
    "btn-pill": pill || false,
    ...(size && { [`btn-${size}`]: true } || {}),
    "btn-block": block || false,
  })
  return (
    <button className={className} disabled={disabled}>{children}</button>
  );
}

export const IconButton: React.FC<{ disabled?: boolean, onClick: () => void; icon: IconProp, style?: React.CSSProperties }> = (props) => {
  return <button className="btn btn-icon-only btn-lg btn-primary" {...props}><FontAwesomeIcon icon={props.icon} /></button>
}

export const Nav: React.FC = ({ children }) => {
  return (
    <div className="nav-wrapper position-relative">
      <ul className="nav nav-pills square nav-fill flex-column vertical-tab">{children}</ul>
    </div>
  );
}

export const NavItem: React.FC<{ label: string, icon?: IconProp, onClick?: () => void, active?: boolean }> = ({ label, icon, onClick, active }) => {
  return (
    <li className="nav-item" style={{ userSelect: "none" }}>
      <a className={classNames({ "nav-link": true, active: !!active })} onClick={onClick}>
        <span className="d-block">
          {icon && <span className="mr-2"><FontAwesomeIcon icon={icon} /></span>}
          {label}
        </span>
      </a>
    </li>
  );
}

export const ShadowInset: React.FC<{ style?: React.CSSProperties }> = ({ style, children }) => {
  return (
    <div className="bg-primary shadow-inset rounded" style={style}>{children}</div>
  );
}

interface DropdownItem { label: string, id: string };
type DropdownItemDevider = null;
type DropdownItemType = DropdownItem | DropdownItemDevider;
export const Dropdown: React.FC<{
  items: DropdownItemType[],
  onClick: (item: DropdownItem) => void
}> = ({ items, onClick }) => {
  const [show, setShow] = useState(false);
  function onClickItem(item: DropdownItem) {
    return function() {
      setShow(false);
      onClick(item);
    }
  }
  return (
    <div className={classNames({ "btn-group": true, "dropleft": true, show })}>
      <button onClick={() => setShow(!show)} className="btn btn-tertiary dropdown-toggle dropdown-toggle-split">
        <span className="dropdown-arrow"><FontAwesomeIcon icon={faAngleDown} /></span>
      </button>
      <div className={classNames({ "dropdown-menu": true, show })}>
        {items.map((it, i) =>
          it == null
            ? <div key={i} className="dropdown-divider"></div>
            : <a key={i} className="dropdown-item" onClick={onClickItem(it)}>{it.label}</a>
        )}
      </div>
  </div>
  );
}

export const ProgressBar: React.FC<{ label: string; progress: string, percentage: number }> = ({ label, progress, percentage }) => {
  return (
    <div className="progress-wrapper">
      <div className="progress-info">
        <div className="progress-label">
          <span className="text-gray">{label}</span>
        </div>
        <div className="progress-percentage">
          <span>{progress}</span>
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar bg-gray" role="progressbar" style={{ width: `${percentage}%`, animation: "0.1s linear 0s 1 normal none running animate-positive", opacity: 1}}>
        </div>
      </div>
    </div>
  );
}
