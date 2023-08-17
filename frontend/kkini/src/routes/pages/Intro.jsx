import React from "react";
import "../../css/loading.css";

export default function Loading() {
  return (
    <div class="loading-container">
      <div class="loading"></div>
      <div id="loading-text">loading</div>
    </div>
  );
}
