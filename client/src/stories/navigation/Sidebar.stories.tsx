import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { BrowserRouter as Router } from "react-router-dom";



export default {
  component: Sidebar,
  title: 'Components/Navigation/Sidebar',
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Router>
    <Sidebar {...args} />    
  </Router>
);



export const Default = Template.bind({});
Default.args = {  };