import React from 'react';
import { Descriptions, Badge } from 'antd';

export default function MovieInfo({ movie }) {
  const { original_title, release_date, revenue, runtime, vote_average, vote_count, status, popularity } = movie;
  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">{original_title}</Descriptions.Item>
      <Descriptions.Item label="release_date">{release_date}</Descriptions.Item>
      <Descriptions.Item label="revenue">{revenue}</Descriptions.Item>
      <Descriptions.Item label="runtime">{runtime}</Descriptions.Item>
      <Descriptions.Item label="vote_average" span={2}>
        {vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="vote_count">{vote_count}</Descriptions.Item>
      <Descriptions.Item label="status">{status}</Descriptions.Item>
      <Descriptions.Item label="popularity">{popularity}</Descriptions.Item>
    </Descriptions>
  );
}
