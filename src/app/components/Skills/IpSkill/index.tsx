import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { ReduxState } from '@app/redux/reducers';

import './style.scss';

interface IpSkillMeta {
  data?: {
    ip?: string
  }
}

interface IpSkillProps {
  style?: any
  meta?: IpSkillMeta
}

class IpSkillComponent extends React.Component<IpSkillProps> {
  render() {
    return (
      <div className="IpSkill" style={this.props.style}>
        <div
          className={classnames("ip-address", {
            'not-ready': !this.props.meta?.data?.ip
          })}
        >
          <span>{this.props.meta?.data?.ip}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState /*, ownProps*/): Partial<IpSkillProps> => ({
  // TODO
});

export const IpSkill = connect(mapStateToProps)(IpSkillComponent);
