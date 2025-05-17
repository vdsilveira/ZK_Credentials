fn main(birth_year: Field, current_year: pub Field) {
    let age: u16 = (current_year - birth_year) as u16;
    
    assert(age >= 18);
   
}

#[test]
fn test_main() {
    main(1991, 2025);
}

#[test(should_fail)]
fn test_fail_main() {
    main(2020, 2025);
}