import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from '../../components/navigation/header/Header';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

export default {
  component: Header,
  title: 'Components/Navigation/Header/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Provider store={store}> 
    <Router>
      <Header {...args} />    
    </Router>
  </Provider>
  
);


export const Default = Template.bind({});
Default.args = {  };