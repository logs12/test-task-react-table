import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getCommentsDataAction } from "@/actions/CommentsAction";
import TablePage from "./component";

const mapStateToProps = ({ data }) => ({
  data: data.data,
  isPending: data.isPending,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCommentsDataAction: (page, limits) =>
    dispatch(getCommentsDataAction(page, limits)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
