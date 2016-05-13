import { connect } from 'react-redux';
import { ExplorationModal } from '../exploration_modal.jsx';
import { fetchAdvancedSearchResults } from '../../actions/search_actions.jsx';
import { hoverSection, unhoverSection, addOrRemoveCourse } from '../../actions/timetable_actions.jsx';

const mapStateToProps = (state) => {
	let { isVisible, advancedSearchResults, isFetching, active } = state.explorationModal;
	let courseSections = state.courseSections.objects;
	let course = advancedSearchResults[active];
	let inRoster = false;
	if (course) {
		inRoster = courseSections[course.id] !== undefined
	}
	let activeTimetable = state.timetables.items[state.timetables.active];
	return {
		isVisible,
    	isFetching,
		advancedSearchResults,
		active,
		course,
		inRoster,
		hasHoveredResult: activeTimetable.courses.some(course => course.fake),
		isSectionLocked: (courseId, section) => {
			if (courseSections[courseId] === undefined) {
				return false;
			}
			return Object.keys(courseSections[courseId]).some( 
				(type) => courseSections[courseId][type] == section
			)
		},
		isSectionOnActiveTimetable: (courseId, section) => {
			return activeTimetable.courses.some(course => course.id === courseId && course.enrolled_sections.some(sec => sec == section));
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleExplorationModal: () => dispatch({ type: "TOGGLE_EXPLORATION_MODAL" }),
	  	fetchAdvancedSearchResults: (query) => dispatch(fetchAdvancedSearchResults(query)),
	  	setAdvancedSearchResultIndex: (i) => dispatch({ type: "SET_ACTIVE_RESULT", active: i }),
		hoverSection: hoverSection(dispatch),
		unhoverSection: unhoverSection(dispatch),
		addOrRemoveCourse,

	}
}

const ExplorationModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ExplorationModal);

export default ExplorationModalContainer;
