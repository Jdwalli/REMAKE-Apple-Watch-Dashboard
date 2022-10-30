import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Map from '../../components/common/Map';

export default {
  component: Map,
  title: 'Components/Common/Map',
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = (args) => (
  <Map {...args} />
);

export const Primary = Template.bind({});
Primary.args = {lat: [37.778259000, 37.778194000, 37.778297000], long:[-122.391386000, -122.391226000, -122.391174000], center: [33.07, 10.59], zoom : 2};

export const Disabled = Template.bind({});
Disabled.args = {lat: [37.778259000, 37.778194000, 37.778297000], long:[-122.391386000, -122.391226000, -122.391174000], center: [33.07, 10.59], zoom : 2, disabled: true};