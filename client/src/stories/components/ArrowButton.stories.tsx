import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArrowButton } from '../../components/common/ArrowButton';


export default {
  component: ArrowButton,
  title: 'Components/Common/ArrowButton',
} as ComponentMeta<typeof ArrowButton>;

const Template: ComponentStory<typeof ArrowButton> = (args) => (
  <ArrowButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', direction: 'left' };

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary', direction: 'right' };

export const Disabled = Template.bind({});
Disabled.args = { variant: 'disabled', direction: 'left' };