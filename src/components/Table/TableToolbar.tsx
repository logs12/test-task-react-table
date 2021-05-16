import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from "react";
import {
  IconButton,
  Theme,
  Toolbar,
  Tooltip,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import classnames from "classnames";
import { TableInstance } from "react-table";
import { FilterPage } from "./FilterPage";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    leftButtons: {},
    rightButtons: {},
    leftIcons: {
      "&:first-of-type": {
        marginLeft: -12,
      },
    },
    rightIcons: {
      padding: 12,
      marginTop: "-6px",
      width: 48,
      height: 48,
      "&:last-of-type": {
        marginRight: -12,
      },
    },
  })
);

type ActionButton = {
  icon: JSX.Element;
  onClick: MouseEventHandler;
  enabled?: boolean;
  label: string;
  variant: "right" | "left";
};

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant = "right",
}: ActionButton): ReactElement => {
  const classes = useStyles({});
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === "right",
            [classes.leftIcons]: variant === "left",
          })}
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

export function TableToolbar<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setFilterOpen(true);
    },
    [setAnchorEl, setFilterOpen]
  );

  const handleClose = useCallback(() => {
    setFilterOpen(false);
    setAnchorEl(undefined);
  }, []);

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.rightButtons}>
        <FilterPage<T>
          instance={instance}
          onClose={handleClose}
          show={filterOpen}
          anchorEl={anchorEl}
        />
        <SmallIconActionButton
          icon={<FilterListIcon />}
          onClick={handleFilterClick}
          label="Filter by columns"
          variant="right"
        />
      </div>
    </Toolbar>
  );
}
