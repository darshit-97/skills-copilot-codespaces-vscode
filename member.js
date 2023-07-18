function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        address: '123 Main St'
    };

    var skills = {
        languages: ['JavaScript', 'Ruby', 'Python'],
        isDesigner: true
    };

    var memberSkills = Object.assign(member, skills);
    console.log(memberSkills);
}