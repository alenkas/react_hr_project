var projectsList = [
	{
		name: "первый",
		vacancies: [
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			}
		]
	},
	{
		name: "второй",
		vacancies: [
			{
				name: "Менеджер"
			}
		]
	},
	{
		name: " третий",
		vacancies: [
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			},
			{
				name: "Менеджер"
			}
		]
	}
];

var VacanciesList = React.createClass({
	render: function(){
		// console.log(this.props.vacancies);
		var vacancy = this.props.vacancies;
		var vacancy_list = vacancy.map(function(item, index){
			return (
				<div key={index} className="vacancy">
					<h3>{item.name}</h3>
					<p></p>
				</div>
			);
		});
		return (
			<div>
				{vacancy_list}
			</div>
		);
	}
});

var ProjectList = React.createClass({
	getInitialState: function(){
		return { active: []};
	},
	handleClick: function(index){
		var active = this.state.active.slice();
		active[index] = !active[index];
		this.setState({active});

	},

	renderItem: function(item, index){
		return (
			<div key={index} className="project" onClick={this.handleClick.bind(this, index)}>
				<h2>{item.name}</h2>
				<p>{item.vacancies.length} вакансии</p>
				<div className={this.state.active[index] ? "show" : "hidden"}>
					<VacanciesList vacancies={item.vacancies}/>
				</div>
			</div>
		)
	},
	render: function(){
		var project = this.props.project;
		// console.log("project", project);
		// Arrow function is used to pass 'this' inside map function
		var project_list = project.map(this.renderItem);
		return (
			<div className="project-list">
			{project_list}
			</div>
		);
	}
});

var ProjectFilter = React.createClass({
	render: function(){
		return (
			<div className="project-filter">
				<input type="text" className="project_filter"/>
			</div>
		);
	}
});

var ProjectAdd = React.createClass({
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Название проекта"/>
				<button onClick={this.openModal}>Создать</button>
			</div>
		);
	}
});

var ProjectAddButton = React.createClass({
	getInitialState: function(){
		return {isModalOpen: false};
	},
	toggleModal: function(){
		this.setState({isModalOpen: !this.state.isModalOpen})
	},
	render: function(){
		return (
			<div className="project-new" onClick={this.handleClick}>
				<button onClick={this.toggleModal}>Добавить проект</button>
				<Modal show={this.state.isModalOpen}
					onClose={this.toggleModal}/>
			</div>
		);
	}
});

var Modal = React.createClass({
	render: function(){
		console.log(this.props.show);
		if(!this.props.show){
			return null;
		}
		return (
			<div className="background-overlay">
				<div className="modal">
					Новый проект
					<a href="#" onClick={this.props.onClose}>закрыть</a>
					<hr/>
					<ProjectAdd/>
				</div>
			</div>
		);
	}
});

var App = React.createClass({
	render: function(){
		return (
			<div>
				<ProjectFilter/>
				<ProjectAddButton/>
				<ProjectList project={projectsList}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);