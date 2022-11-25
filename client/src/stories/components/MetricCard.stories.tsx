import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MetricCard } from '../../components/common/MetricCard';

export default {
  component: MetricCard,
  title: 'Components/Common/MetricCard',
} as ComponentMeta<typeof MetricCard>;

const Template: ComponentStory<typeof MetricCard> = (args) => (
  <MetricCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = { metricName: 'Steps', value: 3648392, metricText: "Total Steps Taken", change: -12 };
