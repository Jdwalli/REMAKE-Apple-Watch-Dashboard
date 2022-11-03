import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Calendar from '../../components/common/Calendar';

export default {
  component: Calendar,
  title: 'Components/Common/Calendar',
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);


export const Primary = Template.bind({});
Primary.args = {workoutEvents: [
  {
    workoutActivityType: 'Running',
    startDate: '2022-10-30'
  },
  {
    workoutActivityType: 'Walking',
    startDate: '2022-10-15'
  },
  {
    workoutActivityType: 'Jump Rope',
    startDate: '2022-10-27'
  },
  {
    workoutActivityType: 'Swimming',
    startDate: '2022-10-14'
  }
]}

