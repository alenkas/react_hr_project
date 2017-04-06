var projectsList = [
	{
		name: "Финансовый отдел",
		status: true,
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
		status: true,
		vacancies: [
			{
				name: "Менеджер по найму персонала",
				status: false
			}
		]
	},
	{
		name: "Call-центр",
		status: false,
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
			<a className="link link-grey" href="#" onClick={this.handleClick}>Удалить</a>
		);
	}
});

var CloseVacancy = React.createClass({
	getInitialState: function(e){
		var vacancies = this.props.vacancies;

		return {status: this.props.vacancies[this.props.index].status};
	},
	changeStatus: function(e){
		e.preventDefault();
		var state = this.state.status;
		
		state = !state;

		this.props.addStatus(state, this.props.index);
		this.setState({
			status: state
		});		
	},
	render: function(){
		if(this.props.vacancies[this.props.index].status){
			return(
			<a href="#" className="link link-grey" onClick={this.changeStatus}>Закрыть вакансию</a>
			);	
		} else {
			return(
			<a href="#" className="link link-green" onClick={this.changeStatus}>Открыть вакансию</a>
		);
		}
		
	}
});

var VacanciesList = React.createClass({
	getInitialState: function(){
		return {status: this.props.newState};
	},
	addStatus: function(status, index){
		this.state.status[index].status = status;
		this.setState({
			status: this.state.status
		});
	},
	updateProjects: function(projects){
		var projects = projects;
		this.setState({
			status: projects
		})
	},
	render: function(){
		
		var vacancy = this.props.vacancies;
		var that = this;
		
		if(vacancy.length > 0){

			// console.log(this.props.projects);
			
			var vacancy_list = vacancy.map(function(item, index){
			var itemStatus, iconClassName;
			if(that.props.newState[index].status){
				itemStatus = vacancyOpen;
				iconClassName = "glyphicon glyphicon-search";
			} else {
				itemStatus = vacancyClosed;
				iconClassName = "glyphicon glyphicon-ok";
			}

			
				return (
				<div key={index} className="vacancy">
					<h4>{item.name}</h4>
					<div>
						<div className="vacancy-status">
							<p><i className={iconClassName}></i>{itemStatus}</p>
						</div>
						<div className="vacancy-links">
						
						<CloseVacancy status={that.props.newState[index].status} addStatus={that.addStatus} vacancies={vacancy} index={index}/>
						<DeleteVacancy vacancies={vacancy} index={index}/>

						</div>
					</div>
				</div>
				);

			});
		} else {
			return null;
		}
		return (
			<div className="vacancies-list">
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
	onAddVacancy: function(e){
		console.log(this.props.vacancies);
		// if(this.props.vacancies.length > 0){
		var vacancy = this.props.vacancies.push({name: this.state.input});	
		// } else {
			// this.props.vacancies.push({name: this.state.input, status: false});
			// var vacancy = this.props.vacancies;
		// }
		
		this.setState({
			vacanciesList: vacancy
		});
		render();
	},
	handleClick: function(e){
		this.onAddVacancy();
		this.props.onCloseModal(e);
	},
	handleChange: function(e){
		console.log(e.target.value);
		this.setState({ input: e.target.value });
	},
	render: function(){
		return(
			<div>
				<div>	
				<input type="text" placeholder="Название вакансии" onChange={this.handleChange}/>
				<a className="green-button" href="#" onClick={this.handleClick}>Создать</a>
				</div>
			</div>
		);
	}
});

var ProjectList = React.createClass({
	getInitialState: function(){
		console.log(this.props.projects);
		return { 
			active: [], 
			projects: this.props.projects, 
			projectStatus: this.props.projects,
			projectVacancies: this.props.projects
		};
	},
	addStatus: function(status, index){
		this.state.projectStatus[index].status = status;
		this.state.projectStatus[index].vacancies.forEach(function(vacancy){
			vacancy.status = false;
		});
		this.setState({
			projectStatus: this.state.projectStatus
		});
	},
	projectUpdate: function(projects){
		this.setState({
			projects: projects
		});
	},
	handleClick: function(index, e){
		e.preventDefault();
		var active = this.state.active.slice();
		active[index] = !active[index];
		this.setState({active});
	},
	renderItem: function(item, index){
		var test;
		// console.log(this.state.projectStatus[index].status);
		if(this.state.projectStatus[index].status){
			test = <AddButton index={index} vacancies={item.vacancies} name="вакансию"/>;
		} else {
			test = <span className="project-status"><i className="glyphicon glyphicon-ok"></i>Проект закрыт, сотрудники наняты</span>;
		}
		return (
			<div key={index} className="project">
				<div>
				<h2><a href="#" onClick={this.handleClick.bind(this, index)}>{item.name}</a></h2>
				<div className="project-info">
					<span>{item.vacancies.length} вакансии</span>
					{test}
				</div>
				<div className="project-links">
					<CloseProject projects={this.props.projects} addStatus={this.addStatus} project={item} index={index}/>
					<DeleteProject projects={this.props.projects} onDelete={this.projectUpdate} project={item} index={index}/>
				</div>
				</div>
				<div className={this.state.active[index] ? "show" : "hidden"}>
					<VacanciesList filterText={this.props.filterText} newState={item.vacancies} vacancies={item.vacancies}/>
				</div>
			</div>
		)
	},
	render: function(){
		var projects = this.props.projects;

		var project_list = projects.map(this.renderItem);
		return (
			<div className="project-list">
			{project_list}
			</div>
		);
	}
});

var SearchBar = React.createClass({
	getInitialState: function(){
		return {checked: false}
	},
	handleChange: function(e){

		var checked = !this.state.checked;

		this.props.isVacancyOpen(checked);

		this.setState({checked: checked});

		
	},
	handleFilterTextInputChange: function(e){
		this.props.onFilterTextInput(e.target.value);
	},
	render: function(){
		// console.log(this.state.checked);
		return (
			<div className="search-bar">
				<input 
					type="text"
					className="vacancy_filter" 
					placeholder="Поиск по вакансиям"
					onChange={this.handleFilterTextInputChange}
				/>
				<input
					type="checkbox"
					checked={this.state.checked}
					onChange={this.handleChange}
				/>
				<span>Только открытые</span>
			</div>
		);
	}
});

var VacancyFilter = React.createClass({
	getInitialState: function(){
		return {
			filterText: '',
			isOpen: false,
			projects: this.props.projects,
			filteredProjects: []
		}
	},
	isVacancyOpen: function(open){
		this.setState({
			isOpen: open
		});
	},
	handleFilterTextInput: function(filterText){
		// console.log(filterText);
		var updated = this.state.projects;
		var filteredProjects = [];
		var showOnlyOpenVacancies = this.state.isOpen;

		console.log(this.state.isOpen);
		updated = updated.filter(function(project){
			var news = [];
			var test = project.vacancies.filter(function(item){
				
				if(item.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1){
					if(showOnlyOpenVacancies){
						news.push(item);
					} else {
						news.push(item);
					}
					return true;
				} else {
					return false;
				}
				
			});

			if(test.length > 0){
				filteredProjects.push({
					name: project.name,
					status: project.status,
					vacancies: test
				});
			}
		});
		
		
		this.setState({
			filteredProjects: filteredProjects
		})
	},
	render: function(){
		var projects;
		
		if(this.state.filteredProjects.length == 0){
			projects = this.props.projects;
		} else {
			projects = this.state.filteredProjects;
		}
		// console.log(this.props.projects);
		// console.log(projects);
		return (
			<div className="vacancy-filter">
				<SearchBar
					filterText={this.state.filterText}
					onFilterTextInput={this.handleFilterTextInput}
					isVacancyOpen={this.isVacancyOpen}
				/>
				<AddButton name="проект" title="Проект" projects={this.props.projects}/>
				<ProjectList 
					projects={projects}
					filterText={this.state.filteredProjects}
					isVacancyOpen={this.isVacancyOpen}
				/>
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
		return {projectList: this.props.projects, input: ''};
	},
	onAddProject: function(e){
		// var projectName = this.state.projectList;
		var project = projectsList.push({name: this.state.input, vacancies: []});
		this.setState({
			projectList: project
		});
		console.log(this.state.input);
		console.log(projectsList);
		render();
	},
	handleClick: function(e){
		this.onAddProject();
		this.props.onCloseModal(e);
	},
	handleChange: function(e){
		console.log(e.target.value);
		this.setState({input: e.target.value});
	},
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Название проекта" onChange={this.handleChange}/>
				<a className="green-button" href="#" onClick={this.handleClick}>Создать</a>
			</div>
		);
	}
});

var DeleteProject = React.createClass({
	getInitialState: function(){
		return {projectList: this.props.projects};
	},
	handleClick: function(e){
		e.preventDefault();

		var index = this.props.index;
		var projects = this.state.projectList;
		
		this.props.onDelete(this.state.projectList);
		projects.splice(index, 1);
		this.setState({
			projectList: projects
		});
		
		render();
	},
	render: function(){
		return(
			<a className="link link-grey" href="#" onClick={this.handleClick}>Удалить</a>
		);
	}
});

var CloseProject = React.createClass({
	getInitialState: function(e){
		return {status: this.props.project.status};
	},
	changeStatus: function(e){
		e.preventDefault();
		var state = this.state.status;
		
		state = !state;

		this.props.addStatus(state, this.props.index);
		this.setState({
			status: state
		});		
	},
	render: function(){
		if(this.state.status){
			return(
				<a className="link link-grey" href="#" onClick={this.changeStatus}>закрыть проект</a>
			);	
		} else {
			return(
				<a className="link link-green" href="#" onClick={this.changeStatus}>открыть проект</a>
			);
		}
		
	}
});

var AddButton = React.createClass({
	getInitialState: function(){
		return {isModalOpen: false};
	},
	toggleModal: function(e){
		// console.log(e);
		e.preventDefault();
		
		this.setState({isModalOpen: !this.state.isModalOpen})
		console.log(this.state.isModalOpen);
	},
	render: function(){
		var className;
		if(this.props.title == "Проект"){
			className = "project-new";
		} else {
			className = "vacancy-new";
		}
		return (
			<div className={className} onClick={this.handleClick}>
				<a className="link" href="#" onClick={this.toggleModal}>Добавить {this.props.name}</a>
				<Modal show={this.state.isModalOpen}
					onClose={this.toggleModal} name={this.props.name} title={this.props.title} vacancies={this.props.vacancies} projects={this.props.projects}/>
			</div>
		);
	}
});

var Modal = React.createClass({
	render: function(){
		// console.log(this.props.show);
		if(!this.props.show){
			return null;
		}
		// console.log(this.props.title);
		if(this.props.title == "Проект"){
			return (
			<div className="background-overlay">
				<div className="modal-window">
					<h4>
					Новый проект
					<a className="link link-grey link-right" href="#" onClick={this.props.onClose}><i className="glyphicon glyphicon-remove"></i></a>
					</h4>
					<hr/>
					<ProjectAdd projects={this.props.projects} onCloseModal={this.props.onClose}/>
				</div>
			</div>
			);	
		} else {
			// console.log("vacancies", this.props.vacancies);
			return (
			<div className="background-overlay">
				<div className="modal-window">
					<h4>
					Новая вакансия
					<a className="link link-grey link-right" href="#" onClick={this.props.onClose}><i className="close-icon"></i></a>
					</h4>
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
				<VacancyFilter projects={this.props.projects}/>
			</div>
		);
	}
});

function render(){
	ReactDOM.render(
		<App projects={projectsList}/>,
		document.getElementById('root')
	);
}
render();