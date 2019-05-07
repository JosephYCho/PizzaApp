import React from "react";

class PizzaList extends React.Component {
  render() {
    return (
      <div className="d-flex no-block">
        <div className="col-md-12">
          <div className="table table-responsive stylish-table">
            <table className="col-md-12 table-bordered table-hover footable-5 footable-paging footable-paging-center breakpoint-lg">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Toppings</th>
                  <th>Post Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.props.campaigns && (
                        <CampaignsListMap
                          campaigns={this.props.campaigns}
                          onDelete={this.onDelete}
                          getDate={this.getDate}
                          getCampaignData={this.getCampaignData}
                        />
                      )}
                      {this.state.confirmDelete && (
                        <SweetAlertWarning
                          confirmAction={this.deleteCampaign}
                          cancelAction={this.cancelDelete}
                        />
                      )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PizzaList;
