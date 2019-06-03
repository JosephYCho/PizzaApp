import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const toppingsBreadcrumb = ({ progress }) => {
  const mapProgress = progress.map((oneProgress, index) => (
    <BreadcrumbItem key={index}>
      <a href="#">{oneProgress.name}</a>
    </BreadcrumbItem>
  ));

  return (
    <Breadcrumb>
      <BreadcrumbItem>Added</BreadcrumbItem>
      {mapProgress}
    </Breadcrumb>
  );
};

export default React.memo(toppingsBreadcrumb);
