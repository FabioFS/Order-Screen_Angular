import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table-kitchen-orders',
  templateUrl: './data-table-kitchen-orders.component.html',
  styleUrls: ['./data-table-kitchen-orders.component.scss']
})


export class DataTableKitchenOrdersComponent implements AfterViewInit {

  color = 'black';
  checked = false;
  disabled = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['select','ordem', 'imgUrl', 'pedido', 'mesa', 'feito', 'excluir' ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordem + 1}`;
    }
}

export interface PeriodicElement {
  ordem: number;
  imgUrl: string;
  pedido: string;
  mesa: string;
  feito: boolean;
  excluir: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ordem: 1, imgUrl: 'https://media.istockphoto.com/photos/cheeseburger-isolated-on-white-picture-id1157515115', pedido:'Hamburguer', mesa: '01', feito:false, excluir:false},
  {ordem: 2, imgUrl: 'https://pizzaestupenda.com.br/wp-content/uploads/2018/12/Estupenda-17767.png', pedido:'Pizza Calabresa', mesa: '05', feito:false, excluir:false},
  {ordem: 3, imgUrl: 'https://pizzaestupenda.com.br/wp-content/uploads/2018/12/Estupenda-17691.png', pedido:'Pizza Frango', mesa: '12', feito:false, excluir:false},
  {ordem: 1, imgUrl: 'https://s1.1zoom.me/big0/599/Hamburger_Closeup_Frikadeller_Cheese_White_570310_1280x800.jpg', pedido:'Hmaburguer', mesa: '12', feito:false, excluir:false},
  {ordem: 1, imgUrl: 'https://s1.1zoom.me/big0/599/Hamburger_Closeup_Frikadeller_Cheese_White_570310_1280x800.jpg', pedido:'Hmaburguer', mesa: '12', feito:true, excluir:false},
  {ordem: 1, imgUrl: 'https://s1.1zoom.me/big0/599/Hamburger_Closeup_Frikadeller_Cheese_White_570310_1280x800.jpg', pedido:'Hmaburguer', mesa: '12', feito:false, excluir:false},
  {ordem: 1, imgUrl: 'https://s1.1zoom.me/big0/599/Hamburger_Closeup_Frikadeller_Cheese_White_570310_1280x800.jpg', pedido:'Hmaburguer', mesa: '12', feito:false, excluir:false},
 
];