var projectsList = [
	{
		name: "Финансовый отдел",
		vacancies: [
			{
				name: "Бухгалтер",
				status: true
			},
			{
				name: "Аудитор",
				status: true
			},
			{
				name: "Финансовый директор",
				status: false
			}
		]
	},
	{
		name: "Кадры",
		vacancies: [
			{
				name: "Менеджер по найму персонала",
				status: false
			}
		]
	},
	{
		name: "Call-центр",
		vacancies: [
			{
				name: "Руководитель группы",
				status: true
			},
			{
				name: "Оператор call-центра Москва",
				status: false
			},
			{
				name: "Оператор call-центра Барнаул",
				status: true
			},
			{
				name: "Руководитель отдела",
				status: false
			},
			{
				name: "Технический специалист",
				status: true
			},
			{
				name: "Менеджер по продаже оборудования",
				status: true
			}
		]
	}
];

var vacancyOpen = "Вакансия открыта, идёт набор кандидатов";
var vacancyClosed = "Вакансия закрыта, сотрудник нанят";

var DeleteVacancy = React.createClass({
	getInitialState: function(){
		var vacancies = this.props.vacancies;
		return {vacanciesList: vacancies};
	},
	handleClick: function(e){
		e.preventDefault();

		var vacancies = this.props.vacancies;
		var index = this.props.index;
		
		this.setState({
			vacanciesList: vacancies.splice(index, 1)
		});
		render();
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>Удалить</a>
		);
	}
});

var CloseVacancy = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		console.log("hello2");
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>закрыть вакансию</a>
		);
	}
});

var VacanciesList = React.createClass({
	render: function(){
		// console.log(this.props.vacancies);
		var vacancy = this.props.vacancies;
		if(vacancy.length > 0){
			var vacancy_list = vacancy.map(function(item, index){
				var itemStatus, icon;
				if(item.status){
					itemStatus = vacancyOpen;
					icon = "";
				} else {
					itemStatus = vacancyClosed;
					icon = "";
				}
			return (
				<div key={index} className="vacancy">
					<h3>{item.name}</h3>
					<div>
						<p><i className={icon}></i>{itemStatus}</p>
						<CloseVacancy/>
						<DeleteVacancy vacancies={vacancy} index={index}/>
					</div>
				</div>
				);
			});
		} else {
			return null;
		}
		return (
			<div>
				{vacancy_list}
			</div>
		);
	}
});

var VacancyAdd = React.createClass({
	getInitialState: function(){
		var vacancies = this.props.vacancies;
		return {vacanciesList: vacancies, input: ''};
	},
	onAddProject: function(e){
		var vacancy = this.props.vacancies.push({name: this.state.input});
		this.setState({
			vacanciesList: vacancy
		});
		render();
	},
	handleClick: function(){
		this.onAddProject();
		this.props.onCloseModal();
	},
	handleChange: function(e){
		console.log(e.target.value);
		this.setState({ input: e.target.value });
	},
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Название вакансии" onChange={this.handleChange}/>
				<button onClick={this.handleClick}>Создать</button>
			</div>
		);
	}
});

var ProjectList = React.createClass({
	getInitialState: function(){
		return { active: []};
	},
	handleClick: function(index, e){
		e.preventDefault();
		var active = this.state.active.slice();
		active[index] = !active[index];
		this.setState({active});
	},
	renderItem: function(item, index){
		return (
			<div key={index} className="project">
				<h2><a href="#" onClick={this.handleClick.bind(this, index)}>{item.name}</a></h2>
				<div>{item.vacancies.length} вакансии
					<AddButton index={index} vacancies={item.vacancies}/>
				</div>
				<div>
					<DeleteProject project={item} index={index}/>
					<CloseProject/>
				</div>
				<div className={this.state.active[index] ? "show" : "hidden"}>
					<VacanciesList vacancies={item.vacancies}/>
				</div>
			</div>
		)
	},
	render: function(){
		var project = this.props.project;

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

var ProjectNew = React.createClass({
	render: function(){
		return (
			<div className="project" onClick={this.handleClick.bind(this, index)}>
				<h2>{item.name}</h2>
				<p>{item.vacancies.length} вакансии</p>
				<div className={this.state.active[index] ? "show" : "hidden"}>
					<VacanciesList vacancies={item.vacancies}/>
				</div>
			</div>
		);
	}
});

var ProjectAdd = React.createClass({
	getInitialState: function(){
		return {projectList: projectsList, input: ''};
	},
	onAddProject: function(e){
		// var projectName = this.state.projectList;
		var project = projectsList.push({name: this.state.input, vacancies: 0});
		this.setState({
			projectList: project
		});
		console.log(this.state.input);
		console.log(projectsList);
		render();
	},
	handleClick: function(){
		this.onAddProject();
		this.props.onCloseModal();
	},
	handleChange: function(e){
		console.log(e.target.value);
		this.setState({input: e.target.value});
	},
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Название" onChange={this.handleChange}/>
				<button onClick={this.handleClick}>Создать</button>
			</div>
		);
	}
});

var DeleteProject = React.createClass({
	getInitialState: function(){
		return {projectList: projectsList};
	},
	handleClick: function(e){
		e.preventDefault();

		var index = this.props.index;
		
		this.setState({
			projectList: projectsList.splice(index, 1)
		});
		render();
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>Удалить</a>
		);
	}
});

var CloseProject = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		console.log("hello2");
	},
	render: function(){
		return(
			<a href="#" onClick={this.handleClick}>закрыть вакансию</a>
		);
	}
});

var AddButton = React.createClass({
	getInitialState: function(){
		return {isModalOpen: false};
	},
	toggleModal: function(){
		this.setState({isModalOpen: !this.state.isModalOpen})
	},
	render: function(){
		// console.log("index is", this.props.index);
		// console.log("vacancies", this.props.vacancies);
		return (
			<div className="project-new" onClick={this.handleClick}>
				<button onClick={this.toggleModal}>Добавить {this.props.name}</button>
				<Modal show={this.state.isModalOpen}
					onClose={this.toggleModal} name={this.props.name} title={this.props.title} vacancies={this.props.vacancies}/>
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
		console.log(this.props.title);
		if(this.props.title == "Проект"){
			return (
			<div className="background-overlay">
				<div className="modal">
					Новый проект
					<a href="#" onClick={this.props.onClose}>закрыть</a>
					<hr/>
					<ProjectAdd onCloseProject={this.props.onClose}/>
				</div>
			</div>
			);	
		} else {
			// console.log("vacancies", this.props.vacancies);
			return (
			<div className="background-overlay">
				<div className="modal">
					Новая вакансия
					<a href="#" onClick={this.props.onClose}>закрыть</a>
					<hr/>
					<VacancyAdd onCloseModal={this.props.onClose} vacancies={this.props.vacancies}/>
				</div>
			</div>
		);
		}
		
	}
});

var App = React.createClass({
	render: function(){
		return (
			<div>
				<ProjectFilter/>
				<AddButton name="проект" title="Проект"/>
				<ProjectList project={projectsList}/>
			</div>
		);
	}
});

function render(){
	ReactDOM.render(
		<App/>,
		document.getElementById('root')
	);
}
render();