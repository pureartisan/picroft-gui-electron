import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-spring/renderprops';

import { ReduxState } from '@app/redux/reducers';
import { Skill } from '@app/components/Skills';

interface ActiveSkillProps {
  skillId?: string | null
}

interface ActiveSkillState {
  prevSkillId?: string | null
}

class ActiveSkillComponent extends React.Component<ActiveSkillProps, ActiveSkillState> {

  state: ActiveSkillState = {};

  componentDidUpdate(prevProps: ActiveSkillProps) {
    if (this.props.skillId !== prevProps.skillId) {
      this.setState({
        prevSkillId: prevProps.skillId
      });
    }
  }

  render() {
    return (
      <Transition
        items={this.props.skillId === this.state.prevSkillId}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {sameAsPrev =>
          sameAsPrev
            ? style => <Skill skillId={this.state.prevSkillId} style={style} />
            : style => <Skill skillId={this.props.skillId} style={style} />
        }
      </Transition>
    );
  }

}

const mapStateToProps = (state: ReduxState, ownProps: Partial<ActiveSkillProps>): Partial<ActiveSkillProps> => ({
  skillId: state.skills.activeSkill
});

export const ActiveSkill = connect(mapStateToProps)(ActiveSkillComponent);
