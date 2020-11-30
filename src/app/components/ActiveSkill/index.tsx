import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '@app/redux/reducers';
import { Skill } from '@app/components/Skills';

interface ActiveSkillProps {
  skillId?: string | null
}

const ActiveSkillComponent = (props: ActiveSkillProps) => (
  <React.Fragment>
    {props.skillId && (<Skill skillId={props.skillId} />)}
  </React.Fragment>
);

const mapStateToProps = (state: ReduxState, ownProps: Partial<ActiveSkillProps>): Partial<ActiveSkillProps> => ({
  skillId: state.skills.activeSkill
});

export const ActiveSkill = connect(mapStateToProps)(ActiveSkillComponent);
