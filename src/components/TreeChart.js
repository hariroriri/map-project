// src/components/TreeChart.js

import React, { useState, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import styled from "styled-components";
import data from "../data";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

const DetailsPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const TreeChart = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: treeContainer.current.offsetWidth,
      height: treeContainer.current.offsetHeight,
    });
  }, []);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
  };

  return (
    <Container ref={treeContainer}>
      <Tree
        data={data}
        translate={{
          x: dimensions.width / 2,
          y: dimensions.height / 4,
        }}
        zoomable
        zoom={0.7}
        nodeSize={{ x: 200, y: 200 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        orientation="vertical"
        pathFunc="elbow"
        onClick={handleNodeClick}
        styles={{
          nodes: {
            node: {
              circle: {
                fill: "#6ba292",
              },
              name: {
                fontSize: "14px",
                fill: "#333",
              },
              attributes: {
                fill: "#555",
              },
            },
            leafNode: {
              circle: {
                fill: "#e88f70",
              },
              name: {
                fontSize: "14px",
                fill: "#333",
              },
              attributes: {
                fill: "#555",
              },
            },
          },
        }}
      />
      {selectedNode && (
        <DetailsPanel>
          <h3>{selectedNode.name}</h3>
          {selectedNode.attributes && (
            <ul>
              {Object.entries(selectedNode.attributes).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          )}
        </DetailsPanel>
      )}
    </Container>
  );
};

export default TreeChart;
