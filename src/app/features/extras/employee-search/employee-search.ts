// import { Component, computed, signal } from '@angular/core';

import { Component, computed, signal } from "@angular/core";
import { single } from "rxjs";

// export interface Employee {
//   id: number;
//   name: string;
//   role: string;
//   dept: string;
//   salary: string;
// }

// @Component({
//   selector: 'app-employee-search',
//   imports: [],
//   templateUrl: './employee-search.html',
//   styleUrl: './employee-search.scss',
// })
// export class EmployeeSearch {

//   readonly employees: Employee[] = [
//     { id: 1,  name: 'Arjun Mehta',   role: 'Angular Developer',  dept: 'Engineering', salary: '₹8.5L' },
//     { id: 2,  name: 'Priya Sharma',  role: 'React Developer',    dept: 'Engineering', salary: '₹9L'   },
//     { id: 3,  name: 'Rohit Verma',   role: 'Java Backend Dev',   dept: 'Engineering', salary: '₹10L'  },
//     { id: 4,  name: 'Sneha Patil',   role: 'UI/UX Designer',     dept: 'Design',      salary: '₹7.5L' },
//     { id: 5,  name: 'Kiran Desai',   role: 'Product Manager',    dept: 'Product',     salary: '₹14L'  },
//     { id: 6,  name: 'Anita Joshi',   role: 'DevOps Engineer',    dept: 'Engineering', salary: '₹12L'  },
//     { id: 7,  name: 'Ravi Kumar',    role: 'QA Engineer',        dept: 'QA',          salary: '₹6.5L' },
//     { id: 8,  name: 'Meera Nair',    role: 'Scrum Master',       dept: 'Product',     salary: '₹11L'  },
//     { id: 9,  name: 'Suresh Iyer',   role: 'Data Analyst',       dept: 'Analytics',   salary: '₹9.5L' },
//     { id: 10, name: 'Pooja Agarwal', role: 'Graphic Designer',   dept: 'Design',      salary: '₹7L'   },
//     { id: 11, name: 'Vikram Singh',  role: 'Node.js Developer',  dept: 'Engineering', salary: '₹8L'   },
//     { id: 12, name: 'Divya Rao',     role: 'Business Analyst',   dept: 'Analytics',   salary: '₹10.5L'},
//   ];

//   // all unique departments derived from data
//   readonly departments: string[] = [
//     'All',
//     ...new Set(this.employees.map(e => e.dept))
//   ];

//   // reactive state
//   searchQuery = signal('');
//   activeDept  = signal('All');

//   // derived filtered list — auto-updates when signals change
//   filteredEmployees = computed(() => {
//     const query = this.searchQuery().toLowerCase().trim();
//     const dept  = this.activeDept();

//     return this.employees.filter(emp => {
//       const matchDept   = dept === 'All' || emp.dept === dept;
//       const matchSearch = !query
//         || emp.name.toLowerCase().includes(query)
//         || emp.role.toLowerCase().includes(query)
//         || emp.dept.toLowerCase().includes(query);

//       return matchDept && matchSearch;
//     });
//   });

//   onSearch(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     this.searchQuery.set(input.value);
//   }

//   setDept(dept: string): void {
//     this.activeDept.set(dept);
//   }

//   initials(name: string): string {
//     return name
//       .split(' ')
//       .map(w => w[0])
//       .join('')
//       .slice(0, 2)
//       .toUpperCase();
//   }
// }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { Component, computed, signal } from '@angular/core';

// export interface Employee {
//   id: number;
//   name: string;
//   role: string;
// }

// @Component({
//   selector: 'app-employee-search',
//   imports: [],
//   templateUrl: './employee-search.html',
//   styleUrl: './employee-search.scss',
// })
// export class EmployeeSearch {

//   employees: Employee[] = [
//     { id: 1, name: 'Arjun Mehta',   role: 'Angular Developer' },
//     { id: 2, name: 'Priya Sharma',  role: 'React Developer'   },
//     { id: 3, name: 'Rohit Verma',   role: 'Java Backend Dev'  },
//     { id: 4, name: 'Sneha Patil',   role: 'UI/UX Designer'    },
//     { id: 5, name: 'Kiran Desai',   role: 'Product Manager'   },
//     { id: 6, name: 'Anita Joshi',   role: 'DevOps Engineer'   },
//   ];

//   searchQuery = signal('');

//   filteredEmployees = computed(() =>
//     this.employees.filter(emp =>
//       emp.name.toLowerCase().includes(this.searchQuery().toLowerCase())
//     )
//   );

//   onSearch(event: Event): void {
//     this.searchQuery.set((event.target as HTMLInputElement).value);
//   }
// }
// ///////////////////////////////////////////////////////////////////////////////////////

export interface Employee {
  id: number,
  name: string,
  role: string
}


@Component({
  selector: 'app-employee-search',
  imports: [],
  templateUrl: './employee-search.html',
  styleUrl: './employee-search.scss',
})
export class EmployeeSearch {

  searchQueries = signal('');

  employees: Employee[] = [
    {id: 1, name: 'Alex', role: 'Angular developer'},
    {id: 2, name: 'Alice', role: 'React developer'},
    {id: 3, name: 'Sarah', role: 'Angular developer'},
    {id: 4, name: 'John', role: 'Angular developer'},
  ]

  onSearch(event: Event) {
    this.searchQueries.set((event.target as HTMLInputElement).value);
  }

  filteredEmployee = computed (() => 
    this.employees.filter((emp) => 
      emp.name.toLowerCase().includes(this.searchQueries().toLowerCase())
    )
  );
}