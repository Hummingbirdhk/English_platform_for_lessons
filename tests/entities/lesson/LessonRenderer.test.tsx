import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { store } from '../../../src/app/store/store';
import { LessonRenderer } from '../../../src/entities/lesson/LessonRenderer';
import type { ContentBundle } from '../../../src/content/types';

const content: ContentBundle = {
  lessons:[{id:'l1',title:'Present Simple',grade:6,level:'A2',topic:'Routine',sections:[{id:'s1',type:'feature',feature:'multiple-choice',exerciseId:'e1'}]}],
  exercises:[{id:'e1',type:'multiple-choice',prompt:'Choose the answer',correctOptionId:'b',options:[{id:'a',text:'A'},{id:'b',text:'B'}]}],
};

describe('LessonRenderer', () => {
  it('renders a registered feature from declarative content', () => {
    render(<Provider store={store}><LessonRenderer lesson={content.lessons[0]} exercises={content.exercises} /></Provider>);
    expect(screen.getByRole('heading',{name:'Present Simple'})).toBeInTheDocument();
    expect(screen.getByText('Choose the answer')).toBeInTheDocument();
  });
});
