import {Switch} from "antd";
import React, {Component} from "react";

class FormPost extends Component {
    render() {
        let {state} = this.props;
        let {errors} = state;
        return(
            <div>
                <div className={"jumbotron"}>
                    <h2 className={"text-center"}>Editing #{state.id} Post</h2>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-comment-alt"}/></span>
                            </div>
                            <input
                                type={"text"}
                                className={errors.title.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                id={"title"}
                                name={"title"}
                                onChange={this.handleChange}
                                onBlur={this.handleValidation}
                                value={state.title}
                            />
                        </div>
                        <div className={'error pb-3'}>
                            {errors.title.message !== '' && <span className={"text-danger mx-5"}>{errors.title.message}</span>}
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-file-contract"} style={{fontSize: '20px'}}/></span>
                            </div>
                            <textarea
                                rows={"10"}
                                className={errors.content.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                name={"content"}
                                onChange={this.handleChange}
                                onBlur={this.handleValidation}
                                value={state.content}
                            />
                        </div>
                        <div className={'error pb-3'}>
                            {errors.content.message !== '' && <span className={"text-danger mx-5"}>{errors.content.message}</span>}
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <div className={"input-group mb-3"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text"}><i className={"fas fa-at"}/></span>
                            </div>
                            <input
                                type={"text"}
                                className={errors.author.dangerBorder === true ? "form-control border-danger" : "form-control"}
                                id={"author"}
                                name={"author"}
                                onChange={this.handleChange}
                                onBlur={this.handleValidation}
                                value={state.author}
                            />
                        </div>
                        <div className={'error pb-3'}>
                            {errors.author.message !== '' && <span className={"text-danger mx-5"}>{errors.author.message}</span>}
                        </div>
                    </div>

                    <div className={"form-check form-check-inline p-3"}>
                        <label className={"form-check-label"}>Active status &nbsp;</label>
                        <Switch
                            checked={state.active}
                            onChange={this.onHandleChangeSwitch.bind(this, "active")}/>
                    </div>

                    <hr/>

                    <div className="button-group text-center">
                        <button
                            type={"submit"}
                            className={errors.title.message !== '' || errors.content.message !== '' || errors.author.message !== '' ? "btn btn-success mr-2 disabled" : "btn btn-success mr-2"}
                            onClick={this.handleSubmit.bind(this)}
                        >
                            <i className={"far fa-paper-plane"} style={{fontSize: '18px'}}/>&nbsp;
                            Submit
                        </button>
                        <button
                            type={"submit"}
                            className={"btn btn-danger"}
                            onClick={this.handleReset}
                        >
                            <i className={"fas fa-eraser"} style={{fontSize: '18px'}}/>&nbsp;
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}
export default FormPost;
