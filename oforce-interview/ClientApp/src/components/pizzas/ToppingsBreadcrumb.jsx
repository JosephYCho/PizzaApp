import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const toppingsBreadcrumb = ({ progress }) => {
 const mapProgress = progress.map((progress,index)=>(

       <BreadcrumbItem key={index}>
     <a>{progress}</a>
   </BreadcrumbItem>
    
   
 ));

 return(
    <Breadcrumb>
      <BreadcrumbItem>Added:</BreadcrumbItem>
        {mapProgress}
      </Breadcrumb>
 )
  
};

export default React.memo(toppingsBreadcrumb);
