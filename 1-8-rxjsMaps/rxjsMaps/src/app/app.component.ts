import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import {
  concatMap,
  debounceTime,
  delay,
  exhaustMap,
  from,
  fromEvent,
  map,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatListModule, MatCheckbox, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'rxjsMaps';

  buttonItems$ = new Subject<string>();

  items = new Array(10).fill(0).map((_, i) => `Item ${i + 1}`);

  inputRef = viewChild.required<ElementRef<HTMLElement>>('input');
  destroyRef = inject(DestroyRef);

  users = [
    {
      name: 'panagiotis',
      surname: 'meremetis',
    },
    {
      name: 'fanis',
      surname: 'prodromou',
    },
  ];

  urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ];

  constructor() {
    // from makes observable for each value.
    from([1, 2, 3, 4, 5])
      .pipe(takeUntilDestroyed(this.destroyRef)) // unsubscribe when component is destroyed
      .subscribe((e) => {
        console.log(`from: ${e}`);
      });

    // from events returns an observable for each input after some delay
    effect(() => {
      fromEvent(this.inputRef().nativeElement, 'input')
        .pipe(
          debounceTime(500), // notice that we use debounce for the input. This way we can sent less api calls.
          map((userInput) => (userInput.target as any).value),
          switchMap((value) => this.httpCall(value)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((e) => {
          console.log(`response: ${e}`);
        });

      // demo on how of and map works.
      // of returns the full array
      // inside we use rxjs map to change its value.
      // and then we use js map to take each array item return. (inner map will return a new array with names.)
      // and the outer map(rxjs will return a new array that includes the mapped data)
      of(this.users)
        .pipe(
          map((usersArray) => {
            return usersArray.map((user) => user.name).join(' ');
          })
        )
        .subscribe((user) => {
          console.log(user);
        });

      // from takes an array and returns an observable for each item.
      // this paradigm also demonstrates how concatMap works. Change concatMap to see different behavior
      // concMap will wait for execute them 1 by 1.
      // it waits for the first to be completed before executing the second and so on..
      // i can try all types of maps here to see the differences (switchMap - exhaustMap - mergeMap - concatMap)
      from(this.urls)
        .pipe(concatMap((url) => this.fetchDataFromUrl(url)))
        .subscribe((url) => {
          console.log('Data fetched from url', url);
        });
    });

    // demonstrates the behavior between exhaustMap(first one) - switchMap(last one) - mergeMap(parallel) - concatMap(1 by 1)
    this.buttonItems$
      .pipe(switchMap((item) => this.apiDeleteButton(item)))
      .subscribe((item) => {
        console.log('Delete button clicked', item);
      });
  }

  fetchDataFromUrl(url: string) {
    return of(null).pipe(
      delay(3000),
      map(() => url)
    );
  }

  apiDeleteButton(item: any) {
    return of(null).pipe(
      delay(2000),
      map(() => item)
    );
  }

  httpCall(value: string) {
    return of(value).pipe(map((v) => `Response for ${v}`));
  }
}
