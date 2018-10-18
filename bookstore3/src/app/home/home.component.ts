import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BookItem} from '../data-models/BookItem';
import {Observable, Subscription} from 'rxjs';
import {DataAccessService} from '../data-access-services/data-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  bookItems: BookItem[] = [new BookItem(null, null, null, null, null, null, null, null, null, null, null)];
  // storageBooks: StorageBooks;
  totalBookCount = 12;

  subscriptionBookItems: Subscription;
  subscriptionTotalBookItemCount: Subscription;
  // subscriptionStorageBooks: Subscription;


  itemsPerPage: number;
  paginationArr: number[] = [1];
  currentPage: number;
  @Input() sortBy: string;
  url: string;
  changeSortDirect: boolean;
  activeRow: number;
  activeBookId: number;
  activeBook: BookItem = this.bookItems[0];
  changedBooksId: number[] = [-1];

  newBookItemId: number;
  files: any;

  arr1: number[];
  arr2: number[];

  constructor(private dataAccessService: DataAccessService) {
  }

  ngOnInit() {
    this.itemsPerPage = 12;
    this.subscriptionBookItems = this.dataAccessService.bookItemsChanged.subscribe((bookItems1: BookItem[]) => {
      this.bookItems = bookItems1;
      this.activeBook = bookItems1[0];
    });
    this.subscriptionTotalBookItemCount = this.dataAccessService.totalBookItemCountChanged
      .subscribe((count: number) => {
        this.totalBookCount = count;
        this.paginationArr = Array((this.totalBookCount % this.itemsPerPage) === 0 ?
          Math.floor(this.totalBookCount / this.itemsPerPage) : Math.floor(this.totalBookCount / this.itemsPerPage) + 1)
          .fill(0).map((x, i) => i);
      });
    this.arr1 = Array(6).fill(0).map((x, i) => i);
    this.arr2 = Array(6).fill(0).map((x, i) => (i + 6));


    this.currentPage = 1;
    this.sortBy = 'author';
    this.changeSortDirect = false;
    this.url = 'http://localhost:8080/bookItems?sortBy=' + this.sortBy
      + '&changeSortDirect=' + true + '&page=' + this.currentPage + '&itemsPerPage=' + this.itemsPerPage;
    this.activeRow = -1;
    this.activeBookId = 0;
    this.dataAccessService.getTotalBookItemsCount();
    this.dataAccessService.getBookItems(this.url);
    /*'http://localhost:8080/bookItems?page=1&itemsPerPage=12&sortBy=author'*/

  }


  onSortGet(sortBy: string, changeSortDirect: boolean, page: number) {
    this.sortBy = sortBy;
    this.currentPage = page;
    this.url = 'http://localhost:8080/bookItems?sortBy=' + this.sortBy
      + '&changeSortDirect=' + changeSortDirect + '&page=' + this.currentPage + '&itemsPerPage=' + this.itemsPerPage;
    this.dataAccessService.getBookItems(this.url);
    this.dataAccessService.getTotalBookItemsCount();
    // this.itemsPerPage = 12;
    // this.paginationArr = Array((this.totalBookCount % this.itemsPerPage) === 0 ?
    //   Math.floor(this.totalBookCount / this.itemsPerPage) : Math.floor(this.totalBookCount / this.itemsPerPage) + 1)
    //   .fill(0).map((x, i) => i);
  }

  setActiveRow(index1: number, bookId: number) {
    this.activeRow = index1;
    this.activeBookId = bookId;
    for (const book of this.bookItems) {
      if (book.id === bookId) {
        this.activeBook = book;
        // console.log(this.activeOrder.orderList[0]);
      }
    }
  }

  setChangedBooksId(id: number) {
    if (this.changedBooksId.indexOf(id) === -1) {
      this.changedBooksId.push(id);
    }
  }

  isBookChanged(id: number): boolean {
    for (const num of this.changedBooksId) {
      if (num === id) {
        return true;
      }
    }
    return false;
  }

  onSaveBookItem(bookToSave: BookItem) {
    this.dataAccessService.saveBookItem(bookToSave).subscribe((response) => {
      console.log(response);
      // if (response.status === 200) {
      //   // this.isModalActive = true;
      // }
    });
    this.changedBooksId.splice(this.changedBooksId.indexOf(bookToSave.id), 1);
    console.log(this.changedBooksId);
  }

  closeModal() {
    // this.isModalActive = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changedBooksId.length >= 2) {
      return confirm('Do you want discard changes?');
    }
    return true;
  }

  deleteBookItem(bookToDelete: BookItem) {
    if (confirm('Delete book' + bookToDelete.id)) {
      for (let i = 0; i < this.bookItems.length; i++) {
        if (this.bookItems[i].id === bookToDelete.id) {
          this.bookItems.splice(i, 1);
          this.dataAccessService.deleteBookItem(bookToDelete.id).subscribe((response) => {
            console.log(response);
            if (response.status === 200) {
              // this.isDeleteModalActive = true;
            }
          });
        }
      }
    }
  }

  saveAllChanges() {
    for (let i = 0; i < this.bookItems.length; i++) {
      for (let j = 0; j < this.changedBooksId.length; j++) {
        if (this.bookItems[i].id === this.changedBooksId[j]) {
          this.onSaveBookItem(this.bookItems[i]);
        }
      }
    }
  }

  onSubmitBookItem(form: HTMLFormElement) {
    console.log(form);
    let final_data;
    // let newUserData: string[];
    const formData = new FormData();
    if (this.files != null) {
      const files: FileList = this.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('cover', files[i]);
      }
    }
    formData.append('bookName', form.value.bookName);
    formData.append('author', form.value.author);
    formData.append('publisherId', form.value.publisherId);
    formData.append('publisherName', form.value.publisherName);
    formData.append('publisherDescription', form.value.publisherName);
    formData.append('publisherAdress', form.value.publisherAdress);
    formData.append('category', form.value.category);
    formData.append('price', form.value.price);
    formData.append('ISBN', form.value.isbn);
    // formData.append('password', form.value.password);

    final_data = formData;
    // } else {
    //   // Если нет файла, то слать как обычный JSON
    //   final_data = form.value;
    // }

    this.dataAccessService.createNewBookItem(final_data).subscribe((response) => {
      console.log(response);
    });
  }

  sortBooks(form: HTMLFormElement) {
    this.onSortGet(form.value.sortBy, true, this.currentPage);
  }
}
